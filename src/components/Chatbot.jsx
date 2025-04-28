import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  FaUtensils,
  FaAllergies,
  FaBullseye,
  FaArrowDown,
} from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import "../css/Chatbot.css";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    diet: "",
    allergies: "",
    goal: "",
  });
  const [error, setError] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      const handleScroll = () => {
        const isNearBottom =
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight >
          100;
        setShowScrollButton(isNearBottom);
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleApiRequest = async (
    prompt,
    isMealPlan = false,
    callback = null
  ) => {
    setIsLoading(true);
    setError(null);

    const userMessage = { role: "user", content: prompt };
    const updatedMessages = [...messages, userMessage];

    try {
      setMessages(updatedMessages);

      const response = await axios.post(
        "https://nutricare-2y9k.onrender.com/api/groq",
        {
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        },
        {
          timeout: 30000, // 30 second timeout
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.error?.message || "Unknown error occurred"
        );
      }

      const aiMessage = response.data.message;
      setMessages([...updatedMessages, aiMessage]);

      // Execute callback after state update
      if (callback) {
        setTimeout(() => {
          callback();
        }, 100);
      }
    } catch (error) {
      console.error("API Error:", error);

      const errorMsg =
        error.response?.data?.error ||
        error.message ||
        "Failed to process your request";

      setError(errorMsg);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: isMealPlan
            ? `Sorry, I couldn't generate a meal plan. (${errorMsg})`
            : `Sorry, I couldn't process your request. (${errorMsg})`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMealPlanRequest = async () => {
    const prompt = `Create a detailed personalized meal plan with recipes based on:
- Dietary Preference: ${userPreferences.diet || "none specified"}
- Allergies: ${userPreferences.allergies || "none"}
- Health Goal: ${userPreferences.goal || "general health"}

Please include:
1. Breakfast, lunch, and dinner options
2. Ingredients lists
3. Preparation instructions
4. Nutritional information

Format your response with clear headings for each section.`;

    await handleApiRequest(prompt, true, scrollToBottom);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await handleApiRequest(input);
    setInput("");
  };

  const clearConversation = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="chatbot-page">
      {/* Preferences Section */}
      <div className="preferences-section">
        <div className="preferences-header">
          <GiChefToque className="chef-icon" />
          <h3>Your Dietary Preferences</h3>
        </div>

        <div className="preferences-form">
          <div className="preference-card">
            <div className="preference-icon">
              <FaUtensils />
            </div>
            <div className="input-group">
              <label>Dietary Preference</label>
              <input
                type="text"
                placeholder="e.g., vegan, keto, vegetarian"
                value={userPreferences.diet}
                onChange={(e) =>
                  setUserPreferences({
                    ...userPreferences,
                    diet: e.target.value,
                  })
                }
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="preference-card">
            <div className="preference-icon">
              <FaAllergies />
            </div>
            <div className="input-group">
              <label>Allergies</label>
              <input
                type="text"
                placeholder="e.g., nuts, dairy, gluten"
                value={userPreferences.allergies}
                onChange={(e) =>
                  setUserPreferences({
                    ...userPreferences,
                    allergies: e.target.value,
                  })
                }
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="preference-card">
            <div className="preference-icon">
              <FaBullseye />
            </div>
            <div className="input-group">
              <label>Health Goal</label>
              <input
                type="text"
                placeholder="e.g., weight loss, muscle gain"
                value={userPreferences.goal}
                onChange={(e) =>
                  setUserPreferences({
                    ...userPreferences,
                    goal: e.target.value,
                  })
                }
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            className="generate-button"
            onClick={handleMealPlanRequest}
            disabled={
              isLoading ||
              (!userPreferences.diet &&
                !userPreferences.allergies &&
                !userPreferences.goal)
            }
          >
            {isLoading ? (
              <>
                <span className="spinner"></span> Generating...
              </>
            ) : (
              "Generate Meal Plan"
            )}
          </button>
        </div>
      </div>

      {/* Spacing between sections */}
      <div className="section-spacer"></div>

      {/* Chat Section */}
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h2>Nutrition Assistant</h2>
          <button
            className="clear-button"
            onClick={clearConversation}
            disabled={isLoading || messages.length === 0}
          >
            Clear Chat
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button className="dismiss-error" onClick={() => setError(null)}>
              ×
            </button>
          </div>
        )}

        <div className="chat-section">
          <div className="messages-container" ref={messagesContainerRef}>
            {messages.length === 0 && !isLoading && (
              <div className="welcome-message">
                <p>Welcome to Nutrition Assistant!</p>
                <p>
                  Ask me about nutrition, diets, or set your preferences above
                  to get a personalized meal plan.
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.role === "user" ? "user-message" : "ai-message"
                }`}
              >
                {msg.content.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ))}

            {isLoading && (
              <div className="message ai-message loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length > 2 && showScrollButton && (
            <button
              className="scroll-to-bottom"
              onClick={scrollToBottom}
              aria-label="Scroll to bottom"
            >
              <FaArrowDown />
            </button>
          )}

          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about nutrition..."
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              {isLoading ? <span className="spinner"></span> : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

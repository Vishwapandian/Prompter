**Prompt Builder: Drag-and-Drop Prompt Creation Tool**

---

### 💡 Overview

This project is a visual prompt engineering tool designed to streamline repetitive prompt creation tasks. It provides a Scratch-like drag-and-drop interface where users can compose complex prompts using modular blocks.

The tool is aimed at developers, AI engineers, and prompt designers who frequently reuse similar prompt structures, such as bug reports, feature requests, code explanations, and refactoring prompts.

---

### 🔧 Core Concept

- Users build prompts from **modular templates**.
- Each template is composed of **blocks** that can be dragged into a canvas.
- Templates include **static text**, **input variables**, and **optional AI-style modifiers**.
- Users fill in their context through embedded input fields.
- The tool automatically **generates the full prompt** based on the layout and inputs.

---

### 🚀 Key Use Cases

1. **Different Variations of Bug Fixes**  
   Template Example:  
   "There's a bug in {{component}} where {{bug_description}}. It happens when {{trigger}}."

2. **Different Variations of New Features**  
   Template Example:  
   "Add a feature to {{feature_area}} that allows {{user_action}}. It should {{expected_behavior}}."

3. **Different Variations of Starting a Project**  
   Template Example:  
   "I want to start a new project using {{technology_stack}} that solves {{problem_domain}}. It should include {{key_components}}."

4. **Different Variations of Refactoring/Different Approach**  
   Template Example:  
   "Refactor this {{code_snippet}} to make it more {{goal}}. Alternatively, suggest a different approach to achieve {{objective}}."

5. **Different Variations of Test Case Generations**  
   Template Example:  
   "Generate unit tests for the following function: {{code_snippet}}. Focus on edge cases for {{function_behavior}}."

---

### 🔄 Drag-and-Drop Components

#### 🔹 Static Text Block
- Displays constant instructional text.
- Example: "Please help me fix the following bug in my code:"

#### 🔹 Input Variable Block
- Allows users to insert specific context.
- Appears as an input field.
- Example: "Bug Description: [________]"

#### 🔹 AI Modifier Block
- Optional.
- Changes the tone, style, or intent of the prompt.
- Examples: Make formal, simplify language, add clarification questions.

#### 🔹 Code Snippet Block
- Special input block for code with syntax highlighting support.
- Can be pasted or uploaded.

#### 🔹 Smart Variable Block (Optional Enhancement)
- Suggests autofill values based on user history or other input fields.

---

### 📊 How It Works

1. **Drag blocks into canvas** (e.g., static text, input boxes, code snippets).
2. **Input fields** let the user enter specific details.
3. **Prompt Preview** updates in real time.
4. Final prompt is **auto-compiled**:
   ```
   Please fix the bug in: UserAuth.js
   Bug Description: Memory leak when calling login repeatedly.
   Here is the code:
   ```js
   function login() {
     ...
   }
   ```
5. **Output options**: Copy prompt / Test with OpenAI / Save template

---

### 🧰 Bonus AI Features

- Auto-suggest prompts based on initial description.
- Autofill blanks using context.
- "Refine Prompt" button for improving tone, clarity, or completeness.

---

### 🚀 Tech Stack Suggestions

- **Frontend**: React + Tailwind or ShadCN
- **Drag-and-Drop**: react-dnd or dnd-kit
- **Backend**: Node.js + Express OR Firebase/Supabase
- **Storage**: Firebase / Supabase / MongoDB
- **AI Integration**: OpenAI API (for testing, refinement, suggestions)

---

### 📂 Template Format (JSON Schema - Optional)
```json
{
  "template_name": "Bug Report",
  "blocks": [
    { "type": "text", "value": "There's a bug in" },
    { "type": "input", "name": "component" },
    { "type": "text", "value": "where" },
    { "type": "input", "name": "bug_description" },
    { "type": "text", "value": "It happens when" },
    { "type": "input", "name": "trigger" }
  ]
}
```

---

Can you create a modern web frontend for this? Be inspired by Scratch drag and drop with input boxes to create prompts.

AIzaSyDEMB0rLa-BgsWB2EUjvRs1-dXo4w7pJlY

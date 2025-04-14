# AI Code Generation Agent

A powerful full-stack application that generates complete project structures and code files based on user requirements using OpenAI's GPT-3.5-turbo model.

## 🌟 Features

- **Project Generation**: Generate complete project structures with multiple files
- **Framework Selection**: Support for various frameworks and project types
- **Real-time Preview**: Instant code preview with syntax highlighting
- **Download Options**: 
  - Download individual files
  - Download entire project as ZIP
- **Responsive UI**: Clean and intuitive interface using Chakra UI
- **Full-stack Architecture**: React + TypeScript frontend with Express backend

## 🚀 Tech Stack

- **Frontend**:
  - React with TypeScript
  - Vite for build tooling
  - Chakra UI for styling
  - CodeMirror for code display
  - JSZip for file downloads

- **Backend**:
  - Express.js
  - OpenAI API integration
  - File system operations

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ashishrai21788/ai_agent_code_gen.git
   cd ai_agent_code_gen
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 💻 Usage

1. **Project Configuration**:
   - Enter project description
   - Select framework/technology
   - Specify additional requirements

2. **Generate Code**:
   - Click "Generate Project" to create files
   - Preview generated code in real-time
   - Download individual files or complete project

3. **Code Preview**:
   - Syntax-highlighted code display
   - Easy navigation between files
   - Copy code functionality

## 🔧 Project Structure

```
ai_agent_code_gen/
├── src/
│   ├── components/
│   │   ├── ProjectForm.tsx
│   │   ├── CodeDisplay.tsx
│   │   └── ...
│   ├── App.tsx
│   └── main.tsx
├── server/
│   └── server.js
├── public/
└── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT-3.5-turbo API
- The React and TypeScript communities
- Chakra UI for the component library

## 📞 Contact

Ashish Rai - ashishrai21788@gmail.com

Project Link: [https://github.com/ashishrai21788/ai_agent_code_gen](https://github.com/ashishrai21788/ai_agent_code_gen) 
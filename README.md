# Doodle Chat Application

A responsive chat interface built with React 19, TypeScript, and Vite that integrates with the Doodle Chat API.

## Features

- ✅ Real-time message display with polling
- ✅ Send and receive messages
- ✅ Responsive design for mobile and desktop
- ✅ Username persistence with localStorage
- ✅ Timestamp formatting (e.g., "12 Mar 2014 14:38")
- ✅ Conditional sender display (hides your own name)
- ✅ Auto-scroll to bottom on new messages
- ✅ Comprehensive test coverage with Vitest

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd doodle-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Running Tests

```bash
npm test
```

For watch mode:
```bash
npm run test:watch
```

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── api/
│   └── messages.ts          # API service layer
├── components/
│   ├── ChatList.tsx          # Message list component
│   ├── ChatList.test.tsx
│   ├── MessageInput.tsx      # Input component
│   └── MessageInput.test.tsx
├── types/
│   └── index.ts              # TypeScript interfaces
├── test/
│   └── setup.ts              # Vitest setup
├── App.tsx                   # Main app component
├── App.css                   # Application styles
└── main.tsx                  # Entry point
```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Vitest** - Testing framework
- **Testing Library** - Component testing
- **CSS3** - Styling
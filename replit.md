# Overview

This is a full-stack web application featuring a 3D interactive game built with React Three Fiber on the frontend and an Express.js REST API on the backend. The application showcases a 3D scene where users can navigate through space using WASD controls and spawn objects by pressing the spacebar. The frontend includes comprehensive UI components, performance monitoring, and game state management, while the backend provides a foundation for REST API endpoints with database integration capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript and Vite for fast development and optimized builds

**3D Graphics**: React Three Fiber ecosystem with supporting libraries:
- `@react-three/fiber` for React integration with Three.js
- `@react-three/drei` for common 3D utilities and helpers
- `@react-three/postprocessing` for visual effects

**UI Framework**: Radix UI primitives with Tailwind CSS for styling, providing accessible and customizable components

**State Management**: Zustand with selector subscriptions for game state and audio management, chosen for its simplicity and TypeScript support

**Build System**: Vite with custom configuration supporting:
- GLSL shader files for custom graphics effects
- Large asset support (3D models, audio files)
- Development hot reload with error overlay

## Backend Architecture

**Server Framework**: Express.js with TypeScript for REST API endpoints

**Database Layer**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions

**Data Storage**: Dual storage approach:
- In-memory storage (`MemStorage`) for development and testing
- PostgreSQL database for production (configured via `DATABASE_URL`)

**Development Setup**: Custom Vite integration for seamless full-stack development with middleware mode

## Key Design Patterns

**Component Architecture**: Modular React components with clear separation of concerns:
- Scene management components for 3D rendering
- UI components for game interface
- Performance monitoring for optimization

**State Management Pattern**: Zustand stores with specific domains:
- Game state (phases: ready, playing, ended)
- Audio state (sound effects, background music, mute controls)

**Type Safety**: Comprehensive TypeScript configuration with strict settings and path mapping for clean imports

**Performance Optimization**: 
- Lazy loading and suspense boundaries for 3D content
- Performance monitoring hooks for FPS and input latency tracking
- Optimized asset loading for 3D models and textures

## External Dependencies

**Database**: PostgreSQL via Neon Database serverless driver for scalable data storage

**UI Components**: Radix UI component library for accessible, unstyled UI primitives

**3D Graphics**: Three.js ecosystem through React Three Fiber for WebGL rendering

**Styling**: Tailwind CSS with custom design system configuration including dark mode support

**Development Tools**: 
- Replit-specific Vite plugin for runtime error handling
- ESBuild for production bundling
- PostCSS with Autoprefixer for CSS processing

**Fonts**: Fontsource Inter for consistent typography across the application
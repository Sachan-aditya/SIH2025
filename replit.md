# Punjab Smart Attendance System

## Overview

This is a comprehensive AI-powered attendance management system designed specifically for rural schools in Punjab, India. The system serves over 15,000 schools and provides automated attendance tracking through multiple methods including face recognition, QR code scanning, and manual entry. The platform is built with offline functionality to handle connectivity issues in rural areas and integrates with government systems for reporting and compliance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18 + TypeScript**: Modern frontend built with React using TypeScript for type safety
- **Vite**: Fast build tool and development server for optimal development experience
- **Tailwind CSS + shadcn/ui**: Clean, minimal design system following Indian government standards with white and blue color scheme
- **Wouter**: Lightweight client-side routing for navigation between different user interfaces
- **Component Structure**: Modular architecture with separate dashboards for Teachers, Students, Administrators, and Parents

### State Management & Data Fetching
- **TanStack Query**: Server state management for API calls, caching, and synchronization
- **React Hook Form**: Form handling with validation for attendance marking and data entry
- **Zod**: Schema validation for data integrity across the application

### Backend Architecture
- **Hono**: Lightweight web framework for API endpoints
- **Node.js Server**: Server-side runtime using @hono/node-server
- **RESTful API**: Clean API design for user management and attendance operations
- **In-Memory Storage**: Simple storage solution using MemStorage class (designed to be replaced with database)

### Data Schema & Validation
- **Drizzle**: Database ORM with built-in schema validation
- **Shared Schema**: TypeScript interfaces for User and attendance data with Zod validation
- **Type Safety**: End-to-end type safety from database to frontend components

### UI Components & Design System
- **Radix UI**: Accessible component primitives for complex UI elements
- **Shadcn/ui**: Pre-built components following accessibility standards
- **Government Design Standards**: Clean white and blue color scheme optimized for government use
- **Responsive Design**: Mobile-first approach with support for tablets and smartphones used in rural schools

### Key Features Implementation
- **Multi-Modal Attendance**: Support for face recognition, QR codes, and manual entry
- **Offline Functionality**: Local storage and sync capabilities for areas with poor connectivity
- **Role-Based Access**: Separate interfaces for teachers, students, administrators, and parents
- **Real-Time Analytics**: Dashboard with attendance statistics and trends
- **Government Integration**: Reporting features designed for education department requirements

### Development & Build Tools
- **ESLint**: Code linting with TypeScript support
- **PostCSS**: CSS processing with Tailwind CSS
- **Component Tagger**: Development tool for component identification during development

### Authentication & Security
- **Government Standards**: Built following Indian government digital security guidelines
- **Role-Based Permissions**: Different access levels for various user types
- **Data Privacy**: Designed with student data protection and privacy compliance

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with TypeScript support
- **Vite**: Build tool and development server
- **Hono**: Backend web framework for API development
- **Wouter**: Client-side routing library

### UI & Design Libraries
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component library (@radix-ui/react-*)
- **Lucide React**: Icon library for consistent iconography
- **next-themes**: Theme management for light/dark mode support

### Data Management
- **TanStack Query**: Server state management and caching
- **Drizzle**: Database ORM and query builder
- **Zod**: Schema validation library
- **React Hook Form**: Form state management

### Development Tools
- **TypeScript**: Type safety and development experience
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing and optimization

### Government Integration Readiness
- **Designed for scalability**: Architecture supports 15,000+ schools
- **Offline-first approach**: Handles connectivity issues in rural areas
- **Government compliance**: Built following Indian education department standards
- **Accessibility standards**: WCAG compliant for inclusive access

The system is built to be extensible and can integrate with additional government databases and systems as needed. The current in-memory storage can be easily replaced with PostgreSQL or other databases using Drizzle ORM.
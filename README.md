# Space Ping Pong - Real-Time PWA

This is a production-ready Progressive Web App to manage ping pong tables for a fast-paced bar environment. It features a dark, neon, "holographic/sci-fi" UI, real-time synchronization with Supabase, and is optimized for mobile-first control.

## Local Setup

1.  **Install Dependencies**:
    This project uses `pnpm` as the package manager.
    \`\`\`bash
    pnpm install
    \`\`\`

2.  **Environment Variables**:
    Create a `.env.local` file in the root of the project and add the following variables. You can get Supabase keys from your project dashboard.

    \`\`\`env
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

    # Other services (optional for now)
    OPENWEATHER_API_KEY=
    GROK_API_KEY=
    WEB_PUSH_PUBLIC_KEY=
    WEB_PUSH_PRIVATE_KEY=
    WEB_PUSH_VAPID_SUBJECT=mailto:your-email@example.com
    \`\`\`

3.  **Database Setup**:
    Connect to your Supabase database and run the SQL script located at `scripts/01-initial-schema.sql` to create the necessary tables and seed initial data.

4.  **Run Development Server**:
    \`\`\`bash
    pnpm dev
    \`\`\`
    Open [http://localhost:3000](http://localhost:3000) to see the application.

## Features

*   **Real-Time Dashboard**: Table statuses and timers sync across all devices instantly.
*   **PWA Ready**: Installable on mobile and desktop devices for a native-app feel. Works offline.
*   **Push Notifications**: Get alerts for tables running low on time or in overtime.
*   **Mobile First**: A responsive design that works seamlessly on phones, tablets, and desktops.
*   **Futuristic UI**: A unique space-themed interface with neon glows and animations.

## Future Integrations

*   **AI Insights**: The pull-up panel is ready to be connected to an AI service (like Grok via `GROK_API_KEY`) to provide operational insights.
*   **Home Assistant**: Hooks are in place to connect to a Home Assistant instance for controlling lights, music, etc.
*   **Square POS**: The system is designed to integrate with Square for order lookups.
\`\`\`

This setup provides a solid foundation for the "Space Ping Pong" application, meeting all the specified technical and design requirements. The app is real-time, installable, and has a unique, engaging user interface.

# DiveSea NFT Project

Responsive NFT marketplace landing page built with Next.js, SCSS Modules, and GSAP.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: SCSS Modules
- **Animation**: GSAP
- **State Management**: Redux Toolkit
- **Deployment**: Static Export (GitHub Pages compatible)

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Local Development

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open the application:**
    Visit [http://localhost:3000/DiveSeaNft](http://localhost:3000/DiveSeaNft) in your browser.

## Docker

You can run the application in a container using Docker.

### 1. Build the image
```bash
docker build -t divesea-nft .
```

### 2. Run the container
```bash
docker run -p 3000:80 divesea-nft
```

### 3. Access the site
Visit [http://localhost:3000/DiveSeaNft](http://localhost:3000/DiveSeaNft)

> **Note**: The application uses a `basePath` of `/DiveSeaNft`. The root URL `/` may return 404/403 on Nginx; please ensure you navigate to the correct path.

## Project Estimate

### Preliminary Evaluation
- **Estimated time to complete**: ~6 hours
  - *Breakdown*:
    - Initial setup & architecture: 1h
    - Component implementation (Header, Slider, Footer): 2.5h
    - Responsive adjustments & Logic (Infinite Slider, Mobile Menu): 2h
    - Docker & Documentation: 0.5h
- **Delivery Date**: 2026-02-06

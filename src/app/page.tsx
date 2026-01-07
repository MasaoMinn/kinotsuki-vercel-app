"use client";
import App from '@/app/App'
import { initFurryDevOverlay } from "react-furry-error";

if (process.env.NODE_ENV === "development") {
  initFurryDevOverlay();
}


const Page = () => {
  return (
    <App />
  )
}

export default Page;
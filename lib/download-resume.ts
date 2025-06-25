// lib/download-resume.ts
export const downloadResume = () => {
  const resumeUrl = "/resume.pdf";

  // 1. Open in new tab
  window.open(resumeUrl, "_blank");

  // 2. Trigger download
  const link = document.createElement("a");
  link.href = resumeUrl;
  link.download = "Yuvin_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 3. Show toast (optional here, but usually triggered from button)
};

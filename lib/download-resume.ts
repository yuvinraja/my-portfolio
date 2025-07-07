export const downloadResume = () => {
  const resumeUrl = "/resume.pdf";
  const link = document.createElement("a");
  link.href = resumeUrl;
  link.download = "Yuvin_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const viewResume = () => {
  const resumeUrl = "/resume.pdf";
  window.open(resumeUrl, "_blank");
};

export const Hero2Schema = {
  type: "Hero-2",
  defaults: {
    section: {
      style: {
        backgroundColor: "#2c3e50",
        color: "#ecf0f1",
        fontFamily: "Shabnam",
        fontSize: "16px",
        lineHeight: "1.5",
        minHeight: "500px",
        padding: "80px 0",
      },
    },
    title: {
      content: { text: "لندینگ پیج حرفه‌ای خود را بسازید" },
      style: { fontSize: "40px", fontWeight: "700" },
    },
    description: {
      content: {
        text: "با استفاده از این سیستم می‌توانید در چند دقیقه سایت خود را به صورت اتوماتیک دانلود کنید.",
      },
      style: { fontSize: "18px" },
    },
    buttons: {
      primary: { text: "شروع کنید" },
      secondary: { text: "اطلاعات بیشتر" },
    },
    image: {
      content: {
        src: "https://dummyimage.com/500x300/ccc/000&text=Hero+Image",
      },
      style: {
        backgroundColor: "rgba(0,0,0,0.1)",
        height: "300px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed rgba(255,255,255,0.3)",
      },
    },
  },
};

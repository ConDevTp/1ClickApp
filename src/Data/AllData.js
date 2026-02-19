const DefaultData = {
   font: "Rokh",
}


export const HeadersData = {
  "Header-1": {
    id: "Header-1",
    title: "Collapsed content",
    subtitle: "Toggleable via the navbar brand.",
    textColor: "#ffffff",
    backgroundColor: "#212529",
    fontSize: "16px",
    fontFamily: DefaultData.font,
    lineHeight: "1.5",
    height: "auto",
    fontWeight: "400",
  },
  "Header-2": {
    id: "Header-2",
    brand: "Navbar",
    links: [
      { text: "Home", url: "#", active: true, disabled: false },
      { text: "Link", url: "#", active: false, disabled: false },
      { text: "Disabled", url: "#", active: false, disabled: true },
    ],
    searchPlaceholder: "Search",
    searchBtnText: "Search",
    textColor: "#000000",
    backgroundColor: "#f8f9fa",
    fontSize: "16px",
    fontFamily: DefaultData.font,
    lineHeight: "1.5",
    height: "auto",
    fontWeight: "700",
  },
  "Header-3": {
    id: "Header-3",
    brand: "Navbar",
    searchPlaceholder: "Search",
    searchBtnText: "Search",
    textColor: "#000000",
    backgroundColor: "#f8f9fa",
    fontSize: "16px",
    fontFamily: DefaultData.font,
    lineHeight: "1.5",
    height: "auto",
    fontWeight: "300",
  },
};
export const FootersData = {
  "Footer-1": {
    id: "Footer-1",
    text: "کازینو لایو بت",
    backgroundColor: "#dc3545", 
    textColor: "#ffffff",
    fontSize: "24px",
    fontFamily: DefaultData.font,
    fontWeight: "700",
    padding: "24px",
  },
  "Footer-2": {
    id: "Footer-2",
    copyrightText: "۲۰۲۰ کپی رایت",
    brandText: "CONDEV",
    backgroundColor: "#dc3545",
    textColor: "#ffffff",
    fontSize: "20px",
    fontFamily: DefaultData.font,
    fontWeight: "400",
    padding: "24px",
  },
};

export const HerosData = {
  "Hero-1": {
    id: "Hero-1",
    title: "عنوان تست برای هیرو ۱ (وسط‌چین)",
    subtitle: "این یک زیرعنوان تستی است.",
    buttonText: "دکمه تست",
    backgroundColor: "#4a90e2",
    textColor: "#ffffff",
    fontFamily: "Rokh",
    fontWeight: "700",
    height: "400px",
  },
  "Hero-2": {
    id: "Hero-2",
    title: "لندینگ پیج حرفه‌ای خود را بسازید (دو ستونه)",
    description: "با استفاده از این سیستم می‌توانید در چند دقیقه سایت خود را به صورت اتوماتیک دانلود کنید.",
    primaryButton: "شروع کنید",
    secondaryButton: "اطلاعات بیشتر",
    backgroundColor: "#2c3e50",
    textColor: "#ecf0f1",
    fontFamily: "Shabnam",
    fontWeight: "700",
    height: "500px",
  },
};
export const AllData = {
  ...HeadersData,
  ...FootersData,
  ...HerosData,
};

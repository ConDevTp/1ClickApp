export const generateAppFile = (zip) => {
  const AppFile = `import "bootstrap/dist/css/bootstrap.min.css"; import "bootstrap/dist/js/bootstrap.bundle.min"; import AllLayout from "./Components/AllLayout"; function App() {return <AllLayout />;} export default App;`;
  zip.folder("myapp").folder("src").file("App.js", AppFile);
};
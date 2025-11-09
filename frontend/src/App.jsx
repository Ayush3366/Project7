import "./styles/gradients.css";
import UserForm from "./components/UserForm";

export default function App() {
  return (
    <div className="gradient-bg">
      <div className="container">
        <div className="card">
          <h1>User Info Form</h1>
          <div className="subtle">Interactive validation • Static gradient • Glass UI</div>
          <UserForm />
        </div>
      </div>
    </div>
  );
}

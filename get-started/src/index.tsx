import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";
import "./style.css";

const useOnScreen = (ref: any) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = new IntersectionObserver(
    ([entry]) => {
      // Should not toggle when element leaves viewport after enter
      !entry.isIntersecting || setIntersecting(entry.isIntersecting);

      // setIntersecting(entry.isIntersecting);
    },
    { rootMargin: "0px 0px -40% 0px" }
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  });
  return isIntersecting;
};

const duration = 1000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

interface IStep {
  title: string;
  description: string;
  id: number;
}

const Step = ({ title, description, id }: IStep) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  return (
    <div ref={ref} id="step-wrap">
      <Transition in={isVisible} timeout={500}>
        {(state) => (
          <div className="step">
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              className="step-content"
            >
              <div className="step-content-number-box">{id}</div>
              <div className="step-content-box">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};

const App = () => {
  const steps = [
    {
      title: "Contact us to get an account for your company",
      description:
        "We are currently offering our data products for the corporate market.",
      id: 1,
    },
    {
      title: "Sign in and register your application",
      description:
        "The application you register will be a virtual representation of your real application.",
      id: 2,
    },
    {
      title: "Get access to our data products",
      description:
        "Agree to our terms and conditions and describe how your application will use our data.",
      id: 3,
    },
    {
      title: "Start development",
      description:
        "You will first get access to test environment. When you are happy with the testing, we will do a quick review to ensure that it is ready to go to production.",
      id: 4,
    },
    {
      title: "Go Live!",
      description:
        "Your digital solutions can now be enriched with our insurance data!",
      id: 5,
    },
  ];

  return (
    <div>
      <div style={{ height: "500px" }}></div>
      <div className="step-container">
        {steps.map((data) => {
          return <Step key={data.id} {...data} />;
        })}
      </div>
      <div style={{ height: "500px" }}></div>
    </div>
  );
};

// 1. Contact us to get an account for your company - We are currently offering our data products for the corporate market.

// 2. Sign in and register your application - The application you register will be a virtual representation of your real application.

// 3. Get access to our data products - Agree to our terms and conditions and describe how your application will use our data.

// 4. Start development – You will first get access to test environment. When you are happy with the testing, we will do a quick review to ensure that it is ready to go to production.

// 5. Go Live! - Your digital solutions can now be enriched with our insurance data!

ReactDOM.render(<App />, document.querySelector("#root"));

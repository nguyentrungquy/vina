import { Button, Result } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMobileAppStore } from "../../store/mobile.app";

const NotFound = () => {
  const navigate = useNavigate();
  const { setHeader } = useMobileAppStore();

  useEffect(() => {
    setHeader("Back home");
  }, []);

  return (
    <div className="[&_*]:overflow-hidden">
      <Result
        className="overflow-hidden"
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" size="large" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;

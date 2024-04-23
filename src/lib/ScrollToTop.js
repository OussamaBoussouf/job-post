import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ScrollToTop = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [searchParams]);
};

export default ScrollToTop;

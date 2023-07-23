import { useEffect, useState } from "react";
import "./App.css";
import { CornersOut, CornersIn, MoonIcon, SunIcon } from "./assets/Icon";

function App() {
    const [storedTheme, setStoredTheme] = useState(
        localStorage.getItem("theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
    );

    const switchTheme = () => {
        setStoredTheme(storedTheme == "light" ? "dark" : "light");
    };

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", storedTheme);
    }, [storedTheme]);

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const [fullScreen, setFullScreen] = useState(
        Boolean(document.fullscreenElement)
    );

    const toggleFullScreen = async () => {
        await (document.fullscreenElement
            ? document.exitFullscreen()
            : document.documentElement.requestFullscreen());
    };

    useEffect(() => {
        document.addEventListener("fullscreenchange", () =>
            setFullScreen(Boolean(document.fullscreenElement))
        );

        return () => {
            document.removeEventListener("fullscreenchange", () =>
                setFullScreen(Boolean(document.fullscreenElement))
            );
        };
    }, []);

    return (
        <>
            <div className="container">
                <div>
                    <div className="menu-container">
                        <div onClick={() => switchTheme()}>
                            {storedTheme == "light" ? (
                                <MoonIcon size={31} />
                            ) : (
                                <SunIcon size={32} />
                            )}
                        </div>

                        <div onClick={() => toggleFullScreen()}>
                            {fullScreen ? (
                                <CornersIn size={32} />
                            ) : (
                                <CornersOut size={32} />
                            )}
                        </div>
                    </div>
                </div>

                <p
                    id="time-text"
                    className="noselect"
                    onDoubleClick={() => toggleFullScreen()}
                >
                    {`${
                        time.getHours() % 12 ? time.getHours() % 12 : 12
                    }:${time.getMinutes()}`}
                    <span id="am-pm-text">
                        {time.getHours() >= 12 ? "pm" : "am"}
                    </span>
                </p>
            </div>
        </>
    );
}

export default App;

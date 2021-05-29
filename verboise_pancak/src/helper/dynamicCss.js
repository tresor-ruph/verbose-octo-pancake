const setStyle = (x, y, z) => {
    x.current.classList.add("is-invalid");
    x.current.style.color = "red";
    y.current.classList.add("pwd-invalid");
    y.current.classList.contains("frm-log") &&
        y.current.classList.remove("frm-log");
    z.current.style.color = "red";
};

const clearStyle = (x, y, z) => {
    x.current.classList.contains("is-invalid") &&
        x.current.classList.remove("is-invalid");
    x.current.classList.contains("pwd-invalid") &&
        x.current.classList.remove("pwd-invalid");
    !x.current.classList.contains("frm-log") &&
        y.current.classList.add("frm-log");
    x.current.style.color = "";
    z.current.style.color = "#b3b3b3";
};

export { setStyle, clearStyle }
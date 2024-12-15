const Wrapper = styled.div`

.main-body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  width: 100%;


  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.two-sides {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  place-items: center;
  margin: 0;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  width: 100%;
}
.two-sides aside {
  position: fixed;
  background-color: #333;
  padding: 20px;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
}
.two-sides aside #tabs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.two-sides aside #tabs .tab {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.two-sides aside #tabs .tab:hover, .two-sides aside #tabs .active {
  background-color: #555;
}
.two-sides .main-body {
  display: flex;
  flex-direction: column;
  place-items: center;
}

aside {
  background-color: #333;
  padding: 20px;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  left: 0;
}
aside #tabs {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
aside #tabs .tab {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
aside #tabs .tab:hover, aside #tabs .active {
  background-color: #555;
}

table {
  border-collapse: collapse;
  max-width: 800px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 10px;
  background-color: #333;
}
table th, table td {
  padding: 15px;
  text-align: left;
}
table th {
  background-color: #6c64ff;
  color: #fff;
}
table tr:nth-child(even) {
  background-color: #4c4c4c;
}
table tr:hover {
  background-color: #252525;
}

.chekbox {
  position: relative;
  margin: 20px;
}
.chekbox .cbx {
  position: relative;
  top: 1px;
  width: 27px;
  height: 27px;
  border: 1px solid #c8ccd4;
  border-radius: 3px;
  transition: background 0.1s ease;
  cursor: pointer;
  display: block;
}
.chekbox .cbx:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 8px;
  width: 7px;
  height: 14px;
  opacity: 0;
  transform: rotate(45deg) scale(0);
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transition: all 0.3s ease;
  transition-delay: 0.15s;
}
.chekbox .lbl {
  margin-left: 5px;
  vertical-align: middle;
  cursor: pointer;
}
.chekbox #cbx:checked ~ .cbx {
  border-color: transparent;
  background: #6871f1;
  animation: jelly 0.6s ease;
}
.chekbox #cbx:checked ~ .cbx:after {
  opacity: 1;
  transform: rotate(45deg) scale(1);
}

label {
  position: relative;
  display: block;
}
label .input {
  background-color: #333;
  color: #fff;
  width: 100%;
  padding: 20px 5px 5px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  font-size: medium;
  position: relative;
}

.input + span {
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  left: 10px;
  top: 0px;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.input:placeholder-shown + span {
  top: 12.5px;
  font-size: 0.9em;
}

@keyframes jelly {
  from {
    transform: scale(1, 1);
  }
  30% {
    transform: scale(1.25, 0.75);
  }
  40% {
    transform: scale(0.75, 1.25);
  }
  50% {
    transform: scale(1.15, 0.85);
  }
  65% {
    transform: scale(0.95, 1.05);
  }
  75% {
    transform: scale(1.05, 0.95);
  }
  to {
    transform: scale(1, 1);
  }
}
.hidden-xs-up {
  display: none !important;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button, select {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  margin: 5px;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  color: #fff;
}

.error {
  border: 1px solid #ff6464;
}

button:hover, select:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.hide {
  display: none;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 350px;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #333;
}
.form .flex {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 30px;
}
.form .submit {
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: 0.3s ease;
  background-color: #00bfff;
}
.form .submit:hover {
  background-color: rgba(0, 191, 255, 0.5882352941);
}

.form label .input:focus + span {
  color: #00bfff;
  top: 0px;
  font-size: 0.7em;
  font-weight: 600;
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }
  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}


.body-contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: center;
  margin: 0;
  min-width: 100%;
  min-height: 100vh;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 350px;
  min-height: 350px;
  line-height: 1.5;
  background-color: #333;
  border-radius: 30px;
  color: #fff;
  font-size: 20px;
}

/*# sourceMappingURL=style.css.map */

`;

return <Wrapper>{props.body}</Wrapper>;

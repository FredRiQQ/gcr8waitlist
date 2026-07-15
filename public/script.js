

    const form = document.getElementById("waitlistForm");
    const toggle = document.getElementById("themeToggle");
    const submitBtn = document.getElementById("submitBtn");


    if (toggle) {

        toggle.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {

                toggle.innerHTML = "🌙";

                localStorage.setItem("theme", "light");

            } else {

                toggle.innerHTML = "☀";

                localStorage.setItem("theme", "dark");

            }
        });

    }
    
    window.addEventListener("load", () => {

        const savedtheme = localStorage.getItem("theme");

        if (savedtheme === "light") {

            document.body.classList.add("light-mode");

            if (toggle) {

                toggle.innerHTML = "🌙";

            }

        }

    });


    if (form) {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();


            const name = form.name.value.trim();
            const email = form.email.value.trim();

            if (name === "") {

                alert("please enter your full name.");

                if (email === "") {

                    alert("please enter your email address.");

                    return;
                }

            }

            if (submitBtn) {

                submitBtn.disabled = true;

                submitBtn.innerHTML = "Joining...";

            }

            try {

                const response = await fetch("/api/join", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        name: name,
                        email: email

                    })
                });

                if (!response.ok) {

                    throw new Error("server retured an error.");

                }

                const data = await response.json();

                alert(data.message);

                form.reset();

            }

            catch (error) {

                console.error(error);

                alert("something went wrong. Please try again");

            }

            finally {

                if (submitBtn) {

                    submitBtn.disabled = false;
                    submitBtn.innerHTML = "Join Waitlist";

                }
            }

            // const hiddenElements = document.querySelectorAll(".hidden");
            // const observer = new IntersectionObserver((entries)=>{
            //     entries.forEach((entry)=>{
            //         if(entry.isIntersecting){
            //             entry.target.classList.add("show");
            //         }
            //     });
            // });

            // hiddenElements.forEach((el)=>observer(el));
        });
    }


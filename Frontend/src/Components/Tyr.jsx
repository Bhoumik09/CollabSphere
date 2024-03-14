import React, { useRef } from 'react'

function Tyr() {
    const nameRef = useRef();
    const emailRef = useRef();
    const githubRef = useRef();
    const linkedinRef = useRef();
    const skillsRef = useRef([]);
    const fileInput=useRef();
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            skillsRef.current.push(value);
        } else {
            skillsRef.current = skillsRef.current.filter(skill => skill !== value);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            github: githubRef.current.value,
            linkedin: linkedinRef.current.value,
            skills: skillsRef.current
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Form submitted successfully');
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" ref={nameRef} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" ref={emailRef} />
            </label>
            <br />
            <label>
                GitHub:
                <input type="text" ref={githubRef} />
            </label>
            <br />
            <label>
                LinkedIn:
                <input type="text" ref={linkedinRef} />
            </label>
            <br />
            <label>Skills:</label>
            <br />
            <label>
                <input type="checkbox" value="HTML" onChange={handleCheckboxChange} /> HTML
            </label>
            <br />
            <label>
                <input type="checkbox" value="CSS" onChange={handleCheckboxChange} /> CSS
            </label>
            <br />
            <label>
                <input type="checkbox" value="JavaScript" onChange={handleCheckboxChange} /> JavaScript
            </label>
            {/* Add more checkboxes for other skills as needed */}
            <br />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Tyr

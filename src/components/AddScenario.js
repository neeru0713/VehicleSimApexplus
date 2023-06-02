import React, {useState} from 'react'
import { InputBox } from './InputBox'
import { Button } from './Button'


export const AddScenario = () => {
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [showError1, setShowError1] = useState(false);
    const [showError2, setShowError2] = useState(false);
  
    const handleChange1 = (value) => {
      if (value.trim() === '') {
        setShowError1(true);
      } else {
        setShowError1(false);
       
      }
      setInputValue1(value);
      
    };

    const handleChange2 = (value) => {
      setInputValue2(value);
      setShowError2(false);
    };
  
    const setBtnClicked = (btn) => {
      if(btn === 'Add'){
        if (inputValue1.trim() === '') {
          setShowError1(true);
          
        } else {
          console.log('Form submitted');
        }

        if (inputValue2.trim() === '') {
          setShowError2(true);
        } else {
          console.log('Form submitted');
        }

        if(!showError1 && !showError2) {
          let url = "http://localhost:3000/scenarios";
          let data = {
            name: inputValue1,
            time: inputValue2 + 's',
            vehicles: 0
          }
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers if required
            },
            body: JSON.stringify(data), // Convert the data to JSON string
          })
            .then(response => response.json())
            .then(data => {
              alert('Scenario added successfully')
            })
            .catch(error => {
              alert(error)
            });
        }
      }

      if(btn === 'Reset'){
        setInputValue1('')
        setInputValue2('')
        setShowError1(false);
        setShowError2(false);
      }  
    };

    
  return (
    <div className='add-scenario-container'>
        <p>Scenario / add</p>
        <h2>Add Scenario</h2>
        <div className="add-scenario-box">
            <div className="add-scenario-input-container">
                <InputBox
                    value={inputValue1}
                    label="Scenario Name"
                    onChange={handleChange1} 
                    showError={showError1}
                ></InputBox>

                <InputBox
                    value={inputValue2}
                    label="Scenario Time (seconds)"
                    onChange={handleChange2} 
                    showError={showError2}
                ></InputBox>

            </div>
        </div>

        <div className="add-scenario-btns">
            <Button
            text="Add"
            color="green"
            setBtnClicked={setBtnClicked}
            ></Button>

            <Button
            text="Reset"
            color="orange"
            setBtnClicked={setBtnClicked}
            ></Button>

            <Button
            text="Go Back"
            color="blue"
            setBtnClicked={setBtnClicked}
            ></Button>

        </div>
    </div>
  )
}

export const flashcard =
    ` 
    <div style="display: flex; justify-content: space-between; height: 500px; margin-bottom: 20px;">
        <div style="padding: 10px; background-color: #f9f9f9; margin-right: 10px; height: 100%; width: 50%; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-size: 18px; margin-bottom: 10px; text-align: center;">What is the capital of France?</h3>
            <div style="text-align: center;">
                <span>Question</span>
            </div>
        </div>
        <div style="padding: 10px; background-color: #f9f9f9; height: 100%; width: 50%; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-size: 18px; margin-bottom: 10px; text-align: center;">Paris</h3>
            <div style="text-align: center;">
                <span>Answer</span>
            </div>
        </div>
    </div>
    
    `
export const trueFalse =
    `        
      <div style="padding: 10px; background-color: #f9f9f9; display: flex; flex-direction: column; margin-bottom: 20px;">
        <h3 style="font-size: 18px; margin-bottom: 10px;">Is the sky blue?</h3>
        <div style="margin-left: 20px;">
            <label style="display: block; margin-bottom: 10px;">
                <input type="radio" name="truefalse" style="margin-right: 5px;">
                <span>True</span>
            </label>
            <label style="display: block; margin-bottom: 10px;">
                <input type="radio" name="truefalse" style="margin-right: 5px;">
                <span>False</span>
            </label>
        </div>
    </div>
    `
export const fillInTheGap =
    `        
      <div class="question-container">
        <h2 class="question-title">Is the sky blue?</h2>
        <div class="options-grid">
            <label class="option-item">
                <input type="radio" name="truefalse" value="true" class="option-radio">
                <span class="option-text">True</span>
            </label>
            <label class="option-item">
                <input type="radio" name="truefalse" value="false" class="option-radio">
                <span class="option-text">False</span>
            </label>
        </div>
    </div>
    `
export const mcq =
    `        
       <div style="padding: 10px; background-color: #f9f9f9; display: flex; flex-direction: column; margin-bottom: 20px;">
        <h3 style="font-size: 18px; margin-bottom: 10px;">[ Write your question here ]</h3>
        <div style="margin-left: 20px;">
        <div style="display: flex;">
            <label style="display: block; margin-bottom: 10px; flex-grow: 1;">
                <input type="checkbox" name="option" style="margin-right: 5px;">
                <span>[ Write your option here ]</span>
            </label>
            <label style="display: block; margin-bottom: 10px; flex-grow: 1;">
                <input type="checkbox" name="option" style="margin-right: 5px;">
                <span>[ Write your option here ]</span>
            </label>
        </div>
        <div style="display: flex;">
            <label style="display: block; margin-bottom: 10px; flex-grow: 1;">
                <input type="checkbox" name="option" style="margin-right: 5px;">
                <span>[ Write your option here ]</span>
            </label>
            <label style="display: block; margin-bottom: 10px; flex-grow: 1;">
                <input type="checkbox" name="option" style="margin-right: 5px;">
                <span>[ Write your option here ]</span>
            </label>
        </div></div>
    </div>
    `
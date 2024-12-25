import './App.scss';
import Arrow from './assets/images/icon-arrow.svg?react';


function App() {
  const maxDate: Date = new Date();
  const onlyDigits: RegExp = /^\d+$/;

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {

    if (e.target.value === '') {
      return;
    }

    let value: string = e.target.value;

    if (e.target.id === 'day' || e.target.id === 'month') {
      value = value.padStart(2, '0');
        }
        else if (e.target.id === 'year') {
      value = value.padStart(4, '0');
    }

    e.target.value = value;
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    let value: string = e.target.value;

    if (!onlyDigits.test(value)) {
      value = value.replace(/\D/g, '');
    }

    if ((e.target.id === 'day' || e.target.id === 'month') && value.length > 2) {
      value = value.slice(0, 2);
    }
    else if (e.target.id === 'year' && value.length > 4) {
      value = value.slice(0, 4);
    }

    e.target.value = value;

  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const day: HTMLInputElement = document.getElementById('day') as HTMLInputElement;
    const month: HTMLInputElement = document.getElementById('month') as HTMLInputElement;
    const year: HTMLInputElement = document.getElementById('year') as HTMLInputElement;

    const dayError: HTMLParagraphElement = document.querySelector('.day-error') as HTMLParagraphElement;
    const monthError: HTMLParagraphElement = document.querySelector('.month-error') as HTMLParagraphElement;
    const yearError: HTMLParagraphElement = document.querySelector('.year-error') as HTMLParagraphElement;

    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';

    const birthday: Date = new Date(`${year.value}-${month.value}-${day.value}`);

    if (birthday > maxDate) {
      dayError.textContent = 'Must be a valid date';
      day.setCustomValidity('Must be a valid date');
      month.setCustomValidity('Must be a valid date');
      year.setCustomValidity('Must be a valid date');
      return;
    }

    const diff: number = maxDate.getTime() - birthday.getTime();
    const diffDate: Date = new Date(diff);

    const resultYears: HTMLParagraphElement = document.querySelector('.result-years') as HTMLParagraphElement;
    const resultMonths: HTMLParagraphElement = document.querySelector('.result-months') as HTMLParagraphElement;
    const resultDays: HTMLParagraphElement = document.querySelector('.result-days') as HTMLParagraphElement;

    resultYears.textContent = diffDate.getFullYear() - 1970 + '';
    resultMonths.textContent = diffDate.getMonth().toString();
    resultDays.textContent = diffDate.getDate().toString();

  }

  const onInvalid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const day: HTMLInputElement = document.getElementById('day') as HTMLInputElement;
    const month: HTMLInputElement = document.getElementById('month') as HTMLInputElement;
    const year: HTMLInputElement = document.getElementById('year') as HTMLInputElement;
    
    day.setCustomValidity('');
    month.setCustomValidity('');
    year.setCustomValidity('');

    const dayError: HTMLParagraphElement = document.querySelector('.day-error') as HTMLParagraphElement;
    const monthError: HTMLParagraphElement = document.querySelector('.month-error') as HTMLParagraphElement;
    const yearError: HTMLParagraphElement = document.querySelector('.year-error') as HTMLParagraphElement;

    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';

    if(day.validity.valueMissing) {
      dayError.textContent = 'Field is required';
    }

    if(month.validity.valueMissing) {
      monthError.textContent = 'Field is required';
    }

    if(year.validity.valueMissing) {
      yearError.textContent = 'Field is required';
    }

    if(!day.validity.valid) {
      dayError.textContent = 'Must be a valid day';
    }

    if(!month.validity.valid) {
      monthError.textContent = 'Must be a valid month';
    }

    if(!year.validity.valid) {
      yearError.textContent = 'Must be in the past';
    }
  }

  return (
    <div className="card">
      <form name="birthday" id="birthday" onSubmit={onSubmit} onInvalid={onInvalid}>
        <div>
          <label htmlFor="day">DAY</label>
          <input
            type="number"
            inputMode='numeric'
            name="day"
            id="day"
            min={1}
            max={31}
            placeholder="DD"
            onBlur={onInputBlur}
            onChange={onInputChange}
            required
          />
          <p className="error day-error"></p>
        </div>
        <div>
          <label htmlFor="month">MONTH</label>
          <input
            type="number"
            inputMode='numeric'
            name="month"
            id="month"
            min="1"
            max="12"
            placeholder="MM"
            onBlur={onInputBlur}
            onChange={onInputChange}
            required
          />
          <p className="error month-error"></p>
        </div>
        <div>
          <label htmlFor="year">YEAR</label>
          <input
            type="number"
            inputMode='numeric'
            name="year"
            id="year"
            min="0"
            max={maxDate.getFullYear()}
            placeholder="YYYY"
            onBlur={onInputBlur}
            onChange={onInputChange}
            required
          />
          <p className="error year-error"></p>
        </div>
      </form>

      <div className="radio">
        <hr />
        <button type="submit" form="birthday">
          <Arrow />
        </button>
      </div>

      <div className="result">
        <div className='result-item'>
          <p className='result-years'>--</p>
          <p>years</p>
        </div>
        <div className='result-item'>
          <p className='result-months'>--</p>
          <p>months</p>
        </div>
        <div className='result-item'>
          <p className='result-days'>--</p>
          <p>days</p>
        </div>
      </div>

    </div>
  );
}

export default App;

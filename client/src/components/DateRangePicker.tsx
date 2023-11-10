import  { FormEvent,useRef} from 'react';

const converToDate=(dateString:string)=>{

  const [year, month, day] = dateString.split("-");
  const dateObject = new Date(Number(year), Number(month) - 1, Number(day));
  return dateObject;
}

const DateRangePicker: React.FC <{onDateFilterChange:(fromDate:Date,toDate:Date)=>void}>= ({onDateFilterChange}) => {
    const fromDateRef=useRef<HTMLInputElement>(null);
    const toDateRef=useRef<HTMLInputElement>(null);
    
    const SubmitHandler=(event:FormEvent<HTMLFormElement>)=>{

        event.preventDefault();

        if(fromDateRef.current?.value.length===0 || toDateRef.current?.value.length===0){
            return;
        }
        const fromDate=converToDate(fromDateRef.current!.value);
        const toDate=converToDate(toDateRef.current!.value);
        onDateFilterChange(fromDate,toDate);
    }

  return (
    <form className="flex justify-center items-center mt-8 space-x-4" onSubmit={SubmitHandler}>
      <div className="flex items-center space-x-4">
        <label htmlFor="fromDate" className="text-gray-600">
          From Date:
        </label>
        <input
          type="date"
          id="fromDate"
          name="fromDate"
          ref={fromDateRef}
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="flex items-center space-x-4 ml-4">
        <label htmlFor="toDate" className="text-gray-600">
          To Date:
        </label>
        <input
          type="date"
          id="toDate"
          name="toDate"
          ref={toDateRef}
          className="border rounded px-2 py-1"
        />
      </div>

      <button className='bg-indigo-500 px-8 py-1 rounded '>Filter</button>
    </form>
  );
};

export default DateRangePicker;

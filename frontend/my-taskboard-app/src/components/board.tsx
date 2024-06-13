import Task from "./task";

const board = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-[#1B1D1F] text-[#FEF7EE] rounded-xl">
        Board
        <Task></Task>
      </div>
    </div>
  );
};
export default board;

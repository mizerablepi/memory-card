export default function Modal({ clickHandler }) {
  return (
    <div className="absolute flex justify-center items-center w-screen h-screen bg-[rgba(0,0,0,0.3)]">
      <div className="p-6 bg-white rounded-lg h-[20rem] w-[30rem] flex flex-col justify-between text-center items-center">
        <h1 className="font-bold text-5xl">Game Over</h1>
        <img src="/sp.jpg" alt="" className="h-40 object-contain" />
        <button
          className="text-2xl font-bold bg-[#ffcc01] border-4 border-[#2e68b3] px-6"
          onClick={clickHandler}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default function Card({
  image,
  name,
  index,
  onClickHandler,
  state,
  reset,
}) {
  function setClicked() {
    if (state[index].clicked === true) {
      reset();
    } else {
      let newState = [...state];
      newState[index] = { ...newState[index], clicked: true };
      onClickHandler(newState);
    }
  }
  return (
    <div
      className="bg-[#ffcc01] border-8 border-[#2e68b3] h-72 w-56 flex flex-col align-center p-2 cursor-pointer"
      onClick={setClicked}
    >
      <img src={image} alt="" className="object-contain h-[75%]" />
      <div className="text-2xl font-bold text-center">{name}</div>
    </div>
  );
}

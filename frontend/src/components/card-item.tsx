export interface ICardItem {
  name: string;
  type: string;
}

const CardItem = ({
  data,
  handleSelected,
}: {
  data: ICardItem;
  handleSelected: (selected: ICardItem) => void;
}) => {
  return (
    <div
      className="border-solid border-2 border-sky-500 mx-4 p-2 my-2 cursor-pointer"
      onClick={() => handleSelected(data)}
    >
      {data.name}
    </div>
  );
};
export default CardItem;

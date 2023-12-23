import CardItem, { ICardItem } from "@/components/card-item";
import { data } from "@/utils/data.json";
import { useCallback, useEffect, useState } from "react";

const Assignment1 = () => {
  const [category, setCategory] = useState<any>({ Fruit: [], Vegetable: [] });
  const [allList, setAllList] = useState<ICardItem[]>([]);
  const [check, setCheck] = useState(0);

  const handleSelected = useCallback(
    (selected: ICardItem) => {
      const checkList = allList.find(
        (item: ICardItem) => item.name === selected.name
      );
      if (checkList) {
        const objData = {
          ...category,
          [selected.type]: [...(category[selected.type] ?? []), selected],
        };
        setCategory(objData);
        setAllList(
          allList.filter((list: ICardItem) => list.name !== selected.name)
        );
      } else {
        setAllList((prevList) => [...prevList, selected]);
        const objData = {
          ...category,
          [selected.type]: category[selected.type].filter(
            (list: ICardItem) => list.name !== selected.name
          ),
        };
        setCategory(objData);
      }
      setCheck(0);
    },
    [allList, category]
  );

  const deleteList = () => {
    let intervalId = setInterval(() => {
      setCategory((prevCategory:any) => {
        const newCategory = { ...prevCategory }; 
        let removedList:any = null;

        if (newCategory["Fruit"].length < newCategory["Vegetable"].length) {
          removedList =  newCategory["Vegetable"].pop();
        } else {
          removedList= newCategory["Fruit"].pop();
        }

        if (removedList) {
          setAllList((prevAllList) => [...prevAllList, removedList]);
        }
  
        return newCategory; 
      });

      if (
        category["Fruit"].length === 0 &&
        category["Vegetable"].length === 0
      ) {
        clearInterval(intervalId);
      }
    }, 1000);
  };


  useEffect(() => {
    const id = setInterval(() => {
      setCheck(check + 1);
    }, 1000);
    if (check === 5) {
      deleteList();
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [check]);

  useEffect(() => {
    setAllList(data);
  }, []);
  return (
    <div className="flex">


      <div className="border-assignment1">
        {allList?.map((d: ICardItem, index: number) => {
          return (
            <div key={index}>
              <CardItem data={d} handleSelected={handleSelected} />
            </div>
          );
        })}
      </div>
     
      {Object.entries(category).map((key, index: number) => {
        return (
          <div className="border-assignment1 mx-5" key={index}>
            <div className="header-assignment1">{key[0]}</div>
            {(key[1] as [])?.map((d: ICardItem, i: number) => {
              return (
                <div key={i}>
                  <CardItem data={d} handleSelected={handleSelected} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Assignment1;

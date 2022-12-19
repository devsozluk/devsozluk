export const removeUnique = (a: Array<any>, param: string) => {
  return a.filter((item, pos, array) => {
    return (
      array
        .map((mapItem) => {
          return mapItem[param]._id;
        })
        .indexOf(item[param]._id) === pos
    );
  });
};

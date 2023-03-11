let data = Array(200)
  .fill(0)
  .map((_, index) => {
    return {
      value: index,
      label: index.toString(),
    };
  });

export const DATA_KG = data.filter((item, index) => item.value > 10);

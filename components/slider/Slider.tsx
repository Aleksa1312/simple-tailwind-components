interface ISliderProps {
  value: number;
  onChange: (state: number) => void;
  className?: string;
}

const Slider = (props: ISliderProps) => {
  return (
    <input
      className={props.className}
      type="range"
      value={props.value}
      onChange={(e) => props.onChange(Number(e.target.value))}
    />
  );
};

export default Slider;

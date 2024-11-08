import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { TExerciseCategory } from '@features/workouts/types';

type ExerciseCategoriesSelectProps = {
  categories: TExerciseCategory[];
  onChange: (categoryName: string) => void;
  onCategorySelect: (categoryId: string) => void;
};

const ExerciseCategoriesSelect = (props: ExerciseCategoriesSelectProps) => {
  return (
    <Select
      onValueChange={(value) => {
        props.onCategorySelect(value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={'Wszystkie'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Kategorie</SelectLabel>
          {props.categories.map((category) => (
            <SelectItem key={category.id} value={category.id} title={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { ExerciseCategoriesSelect };

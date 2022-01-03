import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage
} from "@chakra-ui/react";
import { useItemsOwnedQuery } from "client-controllers";
import { ChangeEventHandler, FC } from "react";

interface ItemsSelectProps {
  isInvalid?: boolean;
  isRequired?: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  /** Required if using formik. */
  onBlur?: any;
  /** Required if using formik. */
  name?: string;
}

/**
 *  Returns a chakra FormControl structured as:
 *  <FormControl>
 *    <FormLabel></FormLabel>
 *    <Select></Select>
 *    <FormErrorMessage></FormErrorMessage>
 *  </FormControl>
 */
export const ItemsSelect: FC<ItemsSelectProps> = ({
  isInvalid = false,
  isRequired = true,
  value,
  onChange,
  name,
  onBlur
}) => {
  const { data } = useItemsOwnedQuery({
    variables: { excludeAuctionedOff: true }
  });

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel as="legend" htmlFor={"item-id-select"}>
        Item
      </FormLabel>
      <Select
        value={value}
        onChange={onChange}
        id="item-id-select"
        name={name}
        onBlur={onBlur}
      >
        <option disabled value="-1">
          -Select Item-
        </option>
        {data &&
          data.itemsOwned.items.map(each => (
            <option key={each.name} value={each.id}>
              {each.name}
            </option>
          ))}
      </Select>
      <FormErrorMessage>Please select an item to sell.</FormErrorMessage>
    </FormControl>
  );
};

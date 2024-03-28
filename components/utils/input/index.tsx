import React, { ChangeEvent } from 'react';
import {Control, Controller} from "react-hook-form";
import {TextField} from "@mui/material";

interface InputProps {
  name: string;
  control:  Control<any>;
  defaultValue: string;
  type: string;
  label: string;
  required: boolean;
  textFieldProps?: Record<string, any>;
  value?: string | number;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void ;
  onFocus?: (evt: ChangeEvent<HTMLInputElement>) => void ;
}

const MyInput = ({
	name,
	control,
	defaultValue,
	type,
	label,
	required,
	textFieldProps,
  
}: InputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({field}) => (
				<TextField
					{...field}
					type={type}
					label={label}
					variant="outlined"
					fullWidth
					required={required}
					sx={{mb: 2}}
					{...textFieldProps}
				/>
			)}
		/>
	);
};

export default MyInput
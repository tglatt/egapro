/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useField, FieldRenderProps } from "react-final-form-hooks";
import { FormApi } from "final-form";

import globalStyles from "../utils/globalStyles";

function RadioField({
  field: { input },
  label,
  value,
  disabled
}: {
  field: FieldRenderProps;
  label: string;
  value: string;
  disabled: boolean;
}) {
  const checked = input.value === value;
  return (
    <label css={styles.label}>
      <input
        css={styles.radio}
        {...input}
        type="radio"
        value={value}
        checked={checked}
        disabled={disabled}
      />
      <div css={[styles.fakeRadio, checked && styles.fakeRadioChecked]} />
      <span css={styles.labelText}>{label}</span>
    </label>
  );
}

interface Props {
  form: FormApi;
  readOnly: boolean;
  fieldName: string;
  labelTrue: string;
  labelFalse: string;
}

function RadiosBoolean({
  form,
  readOnly,
  fieldName,
  labelTrue,
  labelFalse
}: Props) {
  const field = useField(fieldName, form);
  return (
    <div css={styles.container}>
      <RadioField
        field={field}
        label={labelTrue}
        value="true"
        disabled={readOnly}
      />
      <div
        css={[
          styles.radioFieldFalse,
          readOnly && styles.radioFieldFalseDisabled
        ]}
      >
        <RadioField
          field={field}
          label={labelFalse}
          value="false"
          disabled={readOnly}
        />
      </div>
    </div>
  );
}

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column"
  }),
  label: css({
    display: "flex",
    fontSize: 14,
    cursor: "pointer"
  }),
  labelText: css({
    lineHeight: "16px"
  }),
  radio: css({
    display: "none"
  }),
  fakeRadio: css({
    width: 16,
    height: 16,
    flexShrink: 0,
    marginRight: 6,
    borderRadius: 8,
    backgroundColor: "white",
    border: `solid ${globalStyles.colors.default} 1px`
  }),
  fakeRadioChecked: css({
    backgroundImage: `radial-gradient(${globalStyles.colors.default} 0%, ${
      globalStyles.colors.default
    } 3px, #FFF 3px)`
  }),
  radioFieldFalse: css({
    marginTop: 9
  }),
  radioFieldFalseDisabled: css({
    opacity: 0
  })
};

export default RadiosBoolean;

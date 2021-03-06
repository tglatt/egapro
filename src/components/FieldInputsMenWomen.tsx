/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { useField } from "react-final-form-hooks";
import { FormApi } from "final-form";

import globalStyles from "../utils/globalStyles";

import { CellHead, Cell, Cell2 } from "./Cell";
import CellInput, { hasFieldError } from "./CellInput";

const required = (value: string): boolean => (value ? false : true);

const mustBeNumber = (value: string): boolean =>
  Number.isNaN(Number(value)) ? true : false;

const validate = (value: string) => {
  const requiredError = required(value);
  const mustBeNumberError = mustBeNumber(value);
  if (!requiredError && !mustBeNumberError) {
    return undefined;
  } else {
    return { required: requiredError, mustBeNumber: mustBeNumberError };
  }
};

interface Props {
  form: FormApi;
  readOnly: boolean;
  name: string;
  calculable: boolean;
  calculableNumber: number;
  femmeFieldName: string;
  hommeFieldName: string;
}

function FieldInputsMenWomen({
  form,
  name,
  readOnly,
  calculable,
  calculableNumber,
  femmeFieldName,
  hommeFieldName
}: Props) {
  const femmesField = useField(
    femmeFieldName,
    form,
    calculable ? validate : undefined
  );
  const hommesField = useField(
    hommeFieldName,
    form,
    calculable ? validate : undefined
  );

  const femmesError = hasFieldError(femmesField.meta);
  const hommesError = hasFieldError(hommesField.meta);
  const error = femmesError || hommesError;

  return (
    <div css={styles.container}>
      <div css={styles.row}>
        <CellHead
          style={[
            styles.cellHead,
            !calculable && styles.cellHeadInvalid,
            error && calculable && styles.cellHeadError
          ]}
        >
          {femmesField.meta.valid && hommesField.meta.valid
            ? calculable
              ? "✓ "
              : "✕ "
            : error
            ? "✕ "
            : null}
          {name}
        </CellHead>

        {readOnly ? (
          <React.Fragment>
            <Cell style={[styles.cellEmpty, styles.cellEmptyMen]}>
              {hommesField.input.value}
            </Cell>

            <Cell style={[styles.cellEmpty, styles.cellEmptyWomen]}>
              {femmesField.input.value}
            </Cell>
          </React.Fragment>
        ) : calculable ? (
          <React.Fragment>
            <CellInput field={hommesField} style={styles.cellMen} />

            <CellInput field={femmesField} style={styles.cellWomen} />
          </React.Fragment>
        ) : (
          <Cell2 css={styles.cell2} />
        )}
      </div>
      {!calculable && (
        <div css={styles.invalid}>
          Le groupe ne peut pas être pris en compte pour le calcul
          <br />
          car il comporte moins de {calculableNumber} femmes ou{" "}
          {calculableNumber} hommes
        </div>
      )}
      {error && calculable && (
        <div css={styles.error}>
          ce champs n’est pas valide, renseignez une valeur numérique
        </div>
      )}
    </div>
  );
}

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    height: 51,
    marginBottom: 10
  }),
  row: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start"
  }),
  cellHead: css({
    height: 22,
    display: "flex",
    alignItems: "center",
    borderBottom: `solid ${globalStyles.colors.default} 1px`,
    fontSize: 14
  }),
  cellHeadInvalid: css({
    color: globalStyles.colors.invalid,
    borderColor: "transparent"
  }),
  cellHeadError: css({
    color: globalStyles.colors.error,
    borderColor: "transparent"
  }),
  cell2: css({
    textAlign: "center"
  }),
  cellMen: css({
    borderColor: globalStyles.colors.men
  }),
  cellWomen: css({
    borderColor: globalStyles.colors.women
  }),
  cellEmpty: css({
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }),
  cellEmptyMen: css({
    color: globalStyles.colors.men
  }),
  cellEmptyWomen: css({
    color: globalStyles.colors.women
  }),
  invalid: css({
    display: "flex",
    alignItems: "center",
    height: 23,
    paddingBottom: 4,
    color: globalStyles.colors.invalid,
    fontSize: 11,
    fontStyle: "italic",
    lineHeight: "12px",
    borderBottom: `solid ${globalStyles.colors.invalid} 1px`
  }),
  error: css({
    display: "flex",
    alignItems: "center",
    height: 18,
    marginTop: 5,
    color: globalStyles.colors.error,
    fontSize: 11,
    fontStyle: "italic",
    lineHeight: "12px",
    borderBottom: `solid ${globalStyles.colors.error} 1px`
  })
};

export default FieldInputsMenWomen;

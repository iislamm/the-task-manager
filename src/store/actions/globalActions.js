import React from 'react'
import ErrorComponent from '../../Components/common/ErrorComponent';
import SuccessComponent from '../../Components/common/SuccessComponent';

export const showError = error => {
  if (error) {
      return <ErrorComponent error={error} />
    } else {
      return <ErrorComponent />;
    }
}

export const showSuccessMessage = message => {
  if (message) {
    return <SuccessComponent message={message} />
  } else {
    return <SuccessComponent />
  }
}
import React, { Component, ErrorInfo, ReactNode } from "react";

export class CustomError extends Error {
  private _isAlert;
  private _path;
  constructor(message: string, _path: string = "/", _isAlert: boolean = false) {
    super(message);
    this._isAlert = _isAlert;
    this._path = _path;
  }

  get isAlert(): boolean {
    return this._isAlert;
  }

  get path(): string {
    return this._path;
  }

  set isAlert(value: boolean) {
    this._isAlert = value;
  }

  set path(value: string) {
    this._path = value;
  }
}
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error instanceof CustomError) {
      if (error.isAlert) {
        alert(error.message);
      }
      window.location.href = error.path; // 에러 페이지로 이동
    }
    console.error(error, errorInfo);
    // 예외 처리 로직
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // window.location.href = "/";
      return <h1>에러 발생!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

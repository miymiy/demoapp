import React from "react";
import { GiftStatusLabel } from "../models/enums";
import styled from "styled-components/native";
import TextBody from "./TextBody";

const getStatusText = (status) => {
  switch (status) {
    case GiftStatusLabel.Opened:
      return "Opened";
    case GiftStatusLabel.Failed:
      return "Failed";
    case GiftStatusLabel.Resending:
      return "Resending";
    case GiftStatusLabel.Pending:
      return "Pending";
    case GiftStatusLabel.Cancelled:
      return "Cancelled";
    case GiftStatusLabel.Scheduled:
      return "Scheduled";
    case GiftStatusLabel.Sending:
      return "Sending";
    case GiftStatusLabel.Completed:
      return "Completed";
    case GiftStatusLabel.Delivered:
    default:
      return "Delivered";
  }
};

const getStatusBackground = (status) => {
  switch (status) {
    case GiftStatusLabel.Opened:
      return "rgba(62, 119, 176, 0.1)";
    case GiftStatusLabel.Failed:
      return "rgba(227, 11, 23, 0.1)";
    case GiftStatusLabel.Scheduled:
    case GiftStatusLabel.Pending:
      return "rgba(220, 88, 0, 0.1)";
    case GiftStatusLabel.Delivered:
    default:
      return "rgba(37, 174, 136, 0.1)";
  }
};

const getStatusTextColor = (status) => {
  switch (status) {
    case GiftStatusLabel.Opened:
      return "rgb(62, 119, 176)";
    case GiftStatusLabel.Failed:
      return "rgb(227, 11, 23)";
    case GiftStatusLabel.Scheduled:
    case GiftStatusLabel.Pending:
      return "rgb(220, 88, 0)";
    case GiftStatusLabel.Delivered:
    default:
      return "rgb(37, 174, 136)";
  }
};

const Container = styled.View`
  border-radius: 500px;
  padding-horizontal: 15px;
  display: flex;
  align-items: center;
  background-color: ${(props) => getStatusBackground(props.status)};
`;

const Text = styled(TextBody)`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => getStatusTextColor(props.status)};
`;

type Props = {
  status: GiftStatusLabel;
};

const StatusLabel = ({ status, ...rest }: Props) => {
  return (
    <Container status={status} {...rest}>
      <Text status={status}>{getStatusText(status)}</Text>
    </Container>
  );
};

export default StatusLabel;

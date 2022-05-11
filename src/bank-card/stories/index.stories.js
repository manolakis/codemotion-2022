import { html } from 'lit';
import '../../bank-card.js';

export default {
  title: 'Components/BankCard',
  component: 'bank-card',
  argTypes: {
    canUnmask: {
      name: 'can unmask',
      type: { name: 'boolean' },
      control: 'boolean',
      table: {
        category: 'controls',
      },
    },
    owner: {
      type: { name: 'string', required: true },
      control: 'text',
      table: {
        category: 'card',
      },
    },
    number: {
      type: { name: 'string', required: true },
      control: 'text',
      table: {
        category: 'card',
      },
    },
    expirationMonth: {
      name: 'month',
      type: { name: 'number', required: true },
      control: 'select',
      options: Array.from(new Array(12).keys()).map(key =>
        String(key + 1).padStart(2, 0)
      ),
      table: {
        category: 'card',
        subcategory: 'expiration',
      },
    },
    expirationYear: {
      name: 'year',
      type: { name: 'number', required: true },
      control: 'select',
      options: Array.from(new Array(6).keys()).map(
        key => new Date().getFullYear() + key
      ),
      table: {
        category: 'card',
        subcategory: 'expiration',
      },
    },
    verificationCode: {
      name: 'CVC',
      type: { name: 'string', required: true },
      control: 'text',
      table: {
        category: 'card',
      },
    },
  },
};

const Template = ({
  owner,
  number,
  expirationMonth,
  expirationYear,
  verificationCode,
  canUnmask,
}) => html`
  <bank-card
    .canUnmask="${canUnmask}"
    owner="${owner}"
    number="${number}"
    expirationMonth="${expirationMonth}"
    expirationYear="${expirationYear}"
    verificationCode="${verificationCode}"
  ></bank-card>
`;

export const Main = Template.bind({});
Main.args = {
  owner: 'Luke Skywalker',
  number: '1234123412341234',
  expirationMonth: String(new Date().getMonth() + 1).padStart(2, 0),
  expirationYear: new Date().getFullYear() + 1,
  verificationCode: '123',
  canUnmask: true,
};

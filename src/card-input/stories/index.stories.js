import { html } from 'lit';
import '../../card-input.js';

export default {
  title: 'CardInput',
  component: 'card-input',
  argTypes: {
    label: {
      type: { name: 'string' },
      control: 'text',
    },
  },
};

const Template = ({ label }) => html`
  <card-input label="${label}"></card-input>
`;

export const Main = Template.bind({});
Main.args = {
  label: 'Número de tarjeta',
};

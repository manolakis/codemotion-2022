import { html } from 'lit';
import '../../card-feature.js';

export default {
  title: 'Features/CardFeature',
  component: 'card-feature',
  argTypes: {
    cardId: {
      type: { name: 'string', required: true },
      control: 'text',
    },
  },
};

const Template = ({ cardId }) => html`
  <card-feature card-id="${cardId}"></card-feature>
`;

export const Main = Template.bind({});
Main.args = {
  cardId: '151aed7a-5b10-486d-9540-419a0b1071cd',
};

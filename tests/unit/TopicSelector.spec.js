import { mount, createLocalVue } from '@vue/test-utils';
import Buefy from 'buefy';
import TopicSelector from '@/components/TopicSelector.vue';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('TopicSelector.vue', () => {
    it('Renders label and topics', () => {
        const topics = ['topic_1', 'topic_2'];
        const wrapper = mount(TopicSelector, {
            localVue,
            propsData: {
                label: 'Input topic'
            },
            data() {
                return {
                    topics
                };
            }
        });
        expect(wrapper.text()).toContain('Input topic');
        expect(wrapper.text()).toContain(topics[0]);
        expect(wrapper.text()).toContain(topics[1]);
    });
});

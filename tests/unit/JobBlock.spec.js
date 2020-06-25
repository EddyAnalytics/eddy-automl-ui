import { mount, createLocalVue } from '@vue/test-utils';
import Buefy from 'buefy';
import JobBlock from '@/components/JobBlock.vue';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('JobBlock.vue', () => {
    const job = {
        id: 1,
        jobName: 'Test Initial',
        status: 1
    };

    it('Renders the job name correctly from prop', async () => {
        const wrapper = mount(JobBlock, {
            localVue,
            propsData: { job }
        });
        expect(wrapper.text()).toContain('Test Initial');
        await wrapper.setProps({ job: { ...job, jobName: 'Test Change' } });
        expect(wrapper.text()).not.toContain('Test Initial');
        expect(wrapper.text()).toContain('Test Change');
    });

    it('Renders the correct icon for job status 1', () => {
        const wrapper = mount(JobBlock, {
            localVue,
            propsData: { job }
        });
        expect(wrapper.html()).toContain('<i class="mdi mdi-cloud-check mdi-48px"></i>');
    });

    it('Renders the correct icon for job status 2', () => {
        const wrapper = mount(JobBlock, {
            localVue,
            propsData: { job: { ...job, status: 2 } }
        });
        expect(wrapper.html()).toContain('<i class="mdi mdi-cloud-refresh mdi-48px"></i>');
    });

    it('Renders the correct icon for job status -1', () => {
        const wrapper = mount(JobBlock, {
            localVue,
            propsData: { job: { ...job, status: -1 } }
        });
        expect(wrapper.html()).toContain('<i class="mdi mdi-cloud-alert mdi-48px"></i>');
    });
});

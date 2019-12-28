import Vue from "vue";
import Vuetify from "vuetify";
import { shallowMount } from "@vue/test-utils";
import QuizzesList from "@/components/QuizzesList.vue";

Vue.use(Vuetify);

describe("QuizzesList.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Some list name";
    const wrapper = shallowMount(QuizzesList, {
      propsData: { listName: msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

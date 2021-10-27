import Counter from "@/components/Counter";
import { shallowMount } from "@vue/test-utils";

describe("Counter Component", () => {

  let wrapper;

  beforeEach(()=> {
    wrapper = shallowMount(Counter);
  })
  // test("debe hacer match con el snapshot", () => {
  //     /* Arrange */
  //   const wrapper = shallowMount(Counter);

  //   // Act

  //   // Assert
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  test('h2 debe tener el valor por defecto "counter"', () => {
    /* Arrange */
    const wrapper = shallowMount(Counter);

    /* Act */
    const h2 = wrapper.find("h2");

    /* Assert */

    expect(h2.text()).toBe("Counter");
  });

  test("el valor por defecto del p debe ser 100", () => {
    /* Arrange */
    // const wrapper = shallowMount(Counter);
    /* Act */
    // const pTags = wrapper.findAll("p");
    // const p = pTags[1].text();
    const p = wrapper.find('[data-test-id="counter"]').text();
    /* Assert */
    expect(p).toBe("100");
  });

  test('debe incrementar y decrrementar el contador', async () => {
      /* Arrange */
    // const wrapper = shallowMount(Counter);
    const [ increaseBtn, decreaseBtn ] = wrapper.findAll('button')
    /* Act */
    await increaseBtn.trigger('click');
    await decreaseBtn.trigger('click');
    await decreaseBtn.trigger('click');
    const value = wrapper.find('[data-test-id="counter"]').text();
     /* Assert */
    expect(value).toBe('99')
  });

  test('debe de establecer el valor por defecto', ()=> {
    const { start } = wrapper.props();
    const value = wrapper.find('[data-test-id="counter"]').text();
    expect( Number(value)).toBe(start)

  })
  test('deve mostrar la prop title', ()=> {
    const title = 'Hola mundo'
    const wrapper = shallowMount(Counter, {
      props: {
        title
      }
    })

    expect(wrapper.find('h2').text()).toBe(title)
  })

});

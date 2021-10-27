import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision.vue'

describe('Indecision Component',()=> {

  let wrapper
  let clgSpy
  
  // mock del fetch api
  global.fetch = jest.fn( () => Promise.resolve({
    json: () => Promise.resolve({
      answer:'yes',
      forced:false,
      image:'https://yesno.wtf/assets/yes/15-3d723ea13af91839a671d4791fc53dcc.gif'
    })
  }))


  beforeEach(() => {
    wrapper = shallowMount( Indecision )
    // para espiar las llamadas al objeto console y metodo log
    clgSpy = jest.spyOn(console, 'log')

    // Limpiar los mock
    jest.clearAllMocks()
  })

  test('debe de hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  })

  test('escribir en el input no debe disparar nada (console.log)', async ()=> {

    // Hacer un mock de la funcion que quiero ver si se ha llamado
    // wrapper.vm es para acceder al componente montado y poder llegar a los metodos
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

    // Busco en html el input con el atributo '[data-test-id="counter"]'
    const input = wrapper.find('[data-test-id="input-cuestion"]');
    // le doy un valor al input, como es RECUERDA: ES ASINCRONO
    await input.setValue('Hola Nacho 😎')
    expect(clgSpy).toHaveBeenCalledTimes(1)
    expect( getAnswerSpy ).not.toHaveBeenCalled()
  })

  test('escribir el simpobolo "?" debe disparar el fetch', async ()=> {
    // Hacer un mock de la funcion que quiero ver si se ha llamado
    // wrapper.vm es para acceder al componente montado y poder llegar a los metodos
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

    // Busco en html el input con el atributo '[data-test-id="counter"]'
    const input = wrapper.find('[data-test-id="input-cuestion"]');
    // le doy un valor al input, como es RECUERDA: ES ASINCRONO
    await input.setValue('Hola Nacho 😎?')
    expect( getAnswerSpy ).toHaveBeenCalledTimes(1)
  })

  test('pruebas en getAnswer', async ()=> {
    await wrapper.vm.getAnswer();
    expect(wrapper.vm.img ).toBe('https://yesno.wtf/assets/yes/15-3d723ea13af91839a671d4791fc53dcc.gif')
    expect(wrapper.vm.answer).toBe('Si!')
  })
  test('pruebas en getAnswer - Fallo en el API', async () => {

    // Implentación mock del fetch
    fetch.mockImplementationOnce(() => {
      Promise.reject('Api is down')
    })
    await wrapper.vm.getAnswer();

    const img = wrapper.find('img')

    expect( img.exists() ).toBeFalsy()
    expect(wrapper.vm.answer).toBe('No se pudo cargar del API')
  })
})
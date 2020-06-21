/* eslint-disable no-console */
import * as React from 'react';
import { ThemeProvider, quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import { theme } from './theme';

// from https://github.com/xz/new.css/blob/master/demo.html

const InnerRoot = quark('div', { themeKey: 'Root' });

export const Root = () => (
  <ThemeProvider theme={theme}>
    <InnerRoot>
      <quark.header>
        <quark.h1>new.css Demo</quark.h1>
      </quark.header>

      <quark.h1>Heading 1</quark.h1>
      <quark.p>
        This is paragraph text. Lorem ipsum dolor sit amet consectetur
        adipisicing elit.
      </quark.p>
      <quark.h2>Heading 2</quark.h2>
      <quark.p>
        This is paragraph text. Lorem ipsum dolor sit amet consectetur
        adipisicing elit.
      </quark.p>
      <quark.h3>Heading 3</quark.h3>
      <quark.p>
        This is paragraph text. Lorem ipsum dolor sit amet consectetur
        adipisicing elit.
      </quark.p>
      <quark.h4>Heading 4</quark.h4>
      <quark.p>
        This is paragraph text. Lorem ipsum dolor sit amet consectetur
        adipisicing elit.
      </quark.p>
      <quark.h5>Heading 5</quark.h5>
      <quark.p>
        This is paragraph text. Lorem ipsum dolor sit amet consectetur
        adipisicing elit.
      </quark.p>
      <quark.h6>Heading 6</quark.h6>
      <quark.p>
        This is paragraph text. Lorem ipsum dolor sit amet consectetur
        adipisicing elit.
      </quark.p>

      <br />
      <quark.hr />
      <br />

      <quark.p>
        Lorem <quark.mark>ipsum</quark.mark> dolor sit amet{' '}
        <quark.strong>consectetur</quark.strong> adipisicing elit. Aut{' '}
        <quark.i>harum molestias</quark.i> labore amet possimus{' '}
        <quark.s>exercitationem aperiam</quark.s> earum, doloribus{' '}
        <quark.u>nobis ducimus</quark.u> maiores quia voluptates quis omnis
        molestiae quisquam.{' '}
        <quark.a href="#">Voluptatibus, officiis laudantium?</quark.a>
      </quark.p>

      <quark.p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.{' '}
        <quark.code>Hic culpa, nobis doloremque</quark.code> veniam non, nihil
        cupiditate odit repellat est <quark.kbd>ALT + F4</quark.kbd> expedita
        facilis. Fuga aspernatur, alias debitis eveniet totam minima vel.
      </quark.p>

      <quark.ul>
        <quark.li>List item</quark.li>
        <quark.li>List item</quark.li>
        <quark.li>List item</quark.li>
        <quark.li>List item</quark.li>
      </quark.ul>

      <quark.ol>
        <quark.li>Step 1</quark.li>
        <quark.li>Step 2</quark.li>
        <quark.li>????</quark.li>
        <quark.li>PROFIT!!!</quark.li>
      </quark.ol>

      <quark.dl>
        <quark.dt>Web</quark.dt>
        <quark.dd>
          The part of the Internet that contains websites and web pages
        </quark.dd>
        <quark.dt>HTML</quark.dt>
        <quark.dd>A markup language for creating web pages</quark.dd>
        <quark.dt>CSS</quark.dt>
        <quark.dd>A technology to make HTML look better</quark.dd>
      </quark.dl>

      <quark.blockquote cite="https://en.wikiquote.org/wiki/Edward_Snowdequark.">
        n If you think privacy is unimportant for you because you have nothing
        to hide, you might as well say free speech is unimportant for you
        because you have nothing useful to say.
        <br />
        <br />– Edward Snowden
      </quark.blockquote>

      <quark.pre>
        &#x3C;!DOCTYPE html&#x3E; &#x3C;html&#x3E; &#x3C;head&#x3E;
        &#x3C;title&#x3E;Hello World&#x3C;/title&#x3E; &#x3C;/head&#x3E;
        &#x3C;body&#x3E; &#x3C;p&#x3E;Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.&#x3C;/p&#x3E; &#x3C;/body&#x3E; &#x3C;/html&#x3E;
      </quark.pre>

      <br />
      <quark.hr />
      <br />

      <quark.table>
        <quark.caption>Ho-kago Tea Time</quark.caption>
        <quark.thead>
          <quark.tr>
            <quark.th>Name</quark.th>
            <quark.th>Instrument</quark.th>
          </quark.tr>
        </quark.thead>
        <quark.tbody>
          <quark.tr>
            <quark.td>Yui Hirasawa</quark.td>
            <quark.td>Lead Guitar</quark.td>
          </quark.tr>
          <quark.tr>
            <quark.td>Mio Akiyama</quark.td>
            <quark.td>Bass</quark.td>
          </quark.tr>
          <quark.tr>
            <quark.td>Ritsu Tainaka</quark.td>
            <quark.td>Drums</quark.td>
          </quark.tr>
          <quark.tr>
            <quark.td>Tsumugi Kotobuki</quark.td>
            <quark.td>Keyboard</quark.td>
          </quark.tr>
          <quark.tr>
            <quark.td>Azusa Nakano</quark.td>
            <quark.td>Rhythm Guitar</quark.td>
          </quark.tr>
        </quark.tbody>
        <quark.tfoot>
          <quark.tr>
            <quark.th>Name</quark.th>
            <quark.th>Instrument</quark.th>
          </quark.tr>
        </quark.tfoot>
      </quark.table>

      <br />
      <quark.hr />
      <br />

      <quark.form>
        <quark.p>
          <quark.em>
            This is not a real form and does not submit or save any information.
          </quark.em>
        </quark.p>
        <quark.p>
          <quark.label>First name</quark.label>
          <br />
          <quark.input type="text" name="first_name" />
        </quark.p>
        <quark.p>
          <quark.label>Last name</quark.label>
          <br />
          <quark.input type="text" name="last_name" />
        </quark.p>
        <quark.p>
          <quark.label>Gender</quark.label>
          <br />
          <quark.label>
            <quark.input type="radio" name="gender" value="Male" />
            Male
          </quark.label>
          <br />
          <quark.label>
            <quark.input type="radio" name="gender" value="Female" />
            Female
          </quark.label>
          <br />
          <quark.label>
            <quark.input type="radio" name="gender" value="other-none-na" />
            Non-binary
          </quark.label>
        </quark.p>
        <quark.p>
          <quark.label>Email</quark.label>
          <br />
          <quark.input type="email" name="email" required />
        </quark.p>
        <quark.p>
          <quark.label>Phone number</quark.label>
          <br />
          <quark.input type="tel" name="phone" />
        </quark.p>
        <quark.p>
          <quark.label>Password</quark.label>
          <br />
          <quark.input type="password" name="password" />
        </quark.p>
        <quark.p>
          <quark.label>Country</quark.label>
          <br />
          <quark.select>
            <quark.option>China</quark.option>
            <quark.option>India</quark.option>
            <quark.option>United States</quark.option>
            <quark.option>Indonesia</quark.option>
            <quark.option>Brazil</quark.option>
          </quark.select>
        </quark.p>
        <quark.p>
          <quark.label>Comments</quark.label>
          <br />
          <quark.textarea />
        </quark.p>
        <quark.p>
          <quark.label>
            <quark.input type="checkbox" value="terms" />I agree to the{' '}
            <quark.a>terms and conditions</quark.a>
          </quark.label>
        </quark.p>
        <quark.p>
          <quark.button>Sign up</quark.button>
          {` `}
          <quark.button type="reset">Reset form</quark.button>
          {` `}
          <quark.button disabled>Disabled</quark.button>
        </quark.p>
      </quark.form>

      <br />
      <quark.hr />
      <br />

      <quark.img
        src="https://elements.xz.style/assets/fuji-daniel-hehn.jpg"
        alt="Mt. Fuji"
      />
      <script async defer src="https://api.newcss.net/latest.js" />
      <noscript>
        <img src="https://api.newcss.net/noscript.gif" alt="" />
      </noscript>
    </InnerRoot>
  </ThemeProvider>
);

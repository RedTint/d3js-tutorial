const s = document.createElement('script')
s.setAttribute('src', 'https://d3js.org/d3.v5.js')
const b = document.getElementsByTagName('body')
b[0].appendChild(s)


// PATHS -  Total #
d3.selectAll('path').size() // 6587

// get county-geo-overlay (6587 - 3231 -56)
d3.selectAll('.county-geo-overlay').size() // 3231
d3.selectAll('.state-geo-overlay').size() // 56

// CIRCLES
d3.selectAll('circle').size() // 3287

/*
    NOTES:
    1. With ONLY CIRCLES,
      1.1 ZOOMING seems fine
      1.2 PANNING fails, not real time. Only updates upon drag ends.
    2. With ONLY PATHS,
      2.1 ZOOMING and PANNING fails
    3. W/O CIRCLES and OVERLAY PATH
      2.1 ZOOMING and PANNING becomes better
    4. W/O OVERLAY PATH
      2.1 ZOOMING is better
      2.2 PANNING fails, only updates when drag ends. Probably because of the CIRCLES.
    5. With all SVG elements, notice HOVER
      5.1 Takes a lot of time (about 2 seconds) to update metrics when hovering from one county path to another.
      5.2 There is not API call, so this is purely FE issue.
    6. With all SVG elements, removing the MOUSEOVER, MOUSEMOVE and MOUSELEAVE from the OVERLAYS
      6.1 Seem to improve the performance by a TINY BIT.
      6.2 Also noticed `mapDiv.transition().style('opacity', 1);`. Note that transition effects actually take tool on your screen as more elements come in.
      6.3 A quick test on simply removing .transition() for the tooltip immediately shows some improvement in the tooltip.
*/

/*
CURRENT MAP ISSUES:
1. [ ] Replicate the BUG in mobile. - iPhone XR.
2. Map is using a separate overlay
- [ ] Option 0 - Improve current app's performance
    - [ ] Prevent events from happening while zooming. Use zoom start and end
    - [ ] Prevent re-rendering when not needed shouldComponentUpdate(). Use the difference function
    - [ ]
- [ ] Option 1 - Optimize Border, Mesh and Fills Adjustment (could be the easiest)
    - [ ] Use country-level fill
    - [ ] Add mesh borders to county and states
    - [ ] County and States - transparent
    - [ ] Display fills on click only
    - [ ] HOVER EFFECT: Try a line only hover effect (current implementation in CSB is through the use of transparent layer on top)
- [ ] Option 2 - Dynamic Simplification (find the most optimized and visually appealing option) - trial & error
- [ ] Option 3 - Switching to Canvas (harder option)

*/
